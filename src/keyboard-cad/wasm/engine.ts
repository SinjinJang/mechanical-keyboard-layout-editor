import { createOpenSCAD, type OpenSCADInstance } from 'openscad-wasm';

export interface OpenScadEngineOptions {
  wasmUrl?: string;
  printOutput?: (text: string) => void;
  printError?: (text: string) => void;
}

/**
 * OpenSCAD WASM Engine Wrapper
 *
 * Browser-compatible version with Node.js dependencies removed.
 */
export class OpenScadEngine {
  private instance: OpenSCADInstance | null = null;
  private initialized: boolean = false;
  private options?: OpenScadEngineOptions;

  private constructor(options?: OpenScadEngineOptions) {
    this.options = options;
  }

  static async initialize(options?: OpenScadEngineOptions): Promise<OpenScadEngine> {
    const engine = new OpenScadEngine(options);

    // Initialize openscad-wasm with options
    engine.instance = await createOpenSCAD({
      noInitialRun: true,
      print: options?.printOutput,
      printErr: options?.printError,
    });

    engine.initialized = true;
    return engine;
  }

  /**
   * Reinitialize the WASM instance
   * Useful if the instance becomes corrupted after a render
   */
  private async reinitialize(): Promise<void> {
    this.instance = await createOpenSCAD({
      noInitialRun: true,
      print: this.options?.printOutput,
      printErr: this.options?.printError,
    });
    this.initialized = true;
  }

  isReady(): boolean {
    return this.initialized && this.instance !== null;
  }

  async render(scadCode: string, format: 'stl' | 'dxf', retryOnError = true): Promise<Uint8Array> {
    if (!this.initialized || !this.instance) {
      throw new Error('Engine not initialized');
    }

    if (format === 'stl') {
      try {
        // Use the high-level API for STL rendering
        const stlString = await this.instance.renderToStl(scadCode);
        return new TextEncoder().encode(stlString);
      } catch (error) {
        // If high-level API fails, try to reinitialize and retry once
        if (retryOnError && typeof error === 'number') {
          try {
            await this.reinitialize();
            return await this.render(scadCode, format, false); // Don't retry again
          } catch (retryError) {
            throw new Error(`OpenSCAD WASM error code: ${error}. Retry failed. This may be a memory issue or invalid OpenSCAD code.`);
          }
        }
        if (typeof error === 'number') {
          throw new Error(`OpenSCAD WASM error code: ${error}. This may be a memory issue or invalid OpenSCAD code.`);
        }
        throw error;
      }
    } else {
      // For DXF, use low-level FS API
      const openscad = this.instance.getInstance();
      const inputPath = '/input.scad';
      const outputPath = `/output.${format}`;

      try {
        // Write input file
        openscad.FS.writeFile(inputPath, scadCode);

        // Call OpenSCAD with appropriate output format
        const returnCode = openscad.callMain([
          inputPath,
          '--enable=manifold',
          '-o',
          outputPath,
        ]);

        if (returnCode !== 0) {
          throw new Error(`OpenSCAD execution failed with code ${returnCode}`);
        }

        // Read output file as binary
        const result = openscad.FS.readFile(outputPath, { encoding: 'binary' });

        // Clean up files
        try {
          openscad.FS.unlink(inputPath);
          openscad.FS.unlink(outputPath);
        } catch (e) {
          // Ignore cleanup errors
        }

        return result;
      } catch (error) {
        // Clean up on error
        try {
          openscad.FS.unlink(inputPath);
          openscad.FS.unlink(outputPath);
        } catch (e) {
          // Ignore cleanup errors
        }
        throw error;
      }
    }
  }

  dispose(): void {
    // Cleanup WASM resources
    this.instance = null;
    this.initialized = false;
  }
}
