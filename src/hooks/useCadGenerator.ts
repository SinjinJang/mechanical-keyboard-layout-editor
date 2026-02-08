import { useState, useCallback, useRef } from 'react';
import FileSaver from 'file-saver';
import { OpenScadEngine, ScadGenerator, type LayoutJson, type PartType, type OutputFormat } from '../keyboard-cad';
import { plateSize } from '../utils/LayoutUtil';

interface EditorKey {
  label?: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  a?: number;
}

/**
 * Convert editor layout format to keyboard-cad LayoutJson format
 */
function convertToLayoutJson(layout: EditorKey[]): LayoutJson {
  const { width, height } = plateSize(layout, true);
  return {
    width,
    height,
    layout: layout.map(key => ({
      label: key.label || '',
      x: key.x,
      y: key.y,
      w: key.w || 1,
      h: key.h || 1,
      a: key.a || 0,
    })),
  };
}

/**
 * Hook for generating CAD files (STL/DXF) using OpenSCAD WASM
 */
export function useCadGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const engineRef = useRef<OpenScadEngine | null>(null);

  const initEngine = useCallback(async () => {
    if (engineRef.current?.isReady()) {
      return engineRef.current;
    }

    setProgress('Initializing OpenSCAD WASM engine...');
    const engine = await OpenScadEngine.initialize({
      printOutput: (text: string) => console.log('[OpenSCAD]', text),
      printError: (text: string) => console.error('[OpenSCAD Error]', text),
    });
    engineRef.current = engine;
    return engine;
  }, []);

  const generateModel = useCallback(async (
    layout: EditorKey[],
    format: OutputFormat,
    partType: PartType = 'plate'
  ) => {
    if (isGenerating) {
      console.log('Generation already in progress');
      return false;
    }

    setIsGenerating(true);
    setError(null);
    setProgress('Starting...');

    try {
      // Initialize engine
      const engine = await initEngine();

      // Convert layout to LayoutJson format
      setProgress('Converting layout...');
      const layoutJson = convertToLayoutJson(layout);

      // Generate OpenSCAD code
      setProgress('Generating OpenSCAD code...');
      const generator = new ScadGenerator(layoutJson, {
        projection2d: format === 'dxf',
      });
      const scadCode = generator.generate(partType);

      // Render using WASM
      setProgress(`Rendering ${format.toUpperCase()}... (this may take a while)`);
      const data = await engine.render(scadCode, format as 'stl' | 'dxf');

      // Download file
      setProgress('Downloading...');
      const mimeType = format === 'stl' ? 'model/stl' : 'application/dxf';
      const blob = new Blob([data], { type: mimeType });
      const filename = `keyboard-${partType}.${format}`;
      FileSaver.saveAs(blob, filename);

      setProgress('Done!');
      setIsGenerating(false);
      return true;
    } catch (err) {
      console.error('CAD generation error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setProgress('');
      setIsGenerating(false);
      return false;
    }
  }, [isGenerating, initEngine]);

  const generateSTL = useCallback((layout: EditorKey[], partType: PartType = 'plate') => {
    return generateModel(layout, 'stl', partType);
  }, [generateModel]);

  const generateDXF = useCallback((layout: EditorKey[], partType: PartType = 'plate') => {
    return generateModel(layout, 'dxf', partType);
  }, [generateModel]);

  const dispose = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.dispose();
      engineRef.current = null;
    }
  }, []);

  return {
    isGenerating,
    progress,
    error,
    generateSTL,
    generateDXF,
    generateModel,
    dispose,
  };
}

export default useCadGenerator;
