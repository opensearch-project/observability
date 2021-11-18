/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { defaultParagraphParser } from '../default_parser';
import {
  sampleNotebook1,
  sampleNotebook2,
  sampleNotebook3,
  sampleNotebook4,
  sampleNotebook5,
  sampleParsedParagraghs1,
  sampleParsedParagraghs2,
} from './sampleDefaultNotebooks';

// Perfect schema
describe('Testing default backend parser function with perfect schema', () => {
  test('defaultParagraphParserTest1', (done) => {
    const parsedParagraphs1 = defaultParagraphParser(sampleNotebook1.paragraphs);
    const parsedParagraphs2 = defaultParagraphParser(sampleNotebook2.paragraphs);
    const parsedParagraphs3 = defaultParagraphParser([]);
    expect(parsedParagraphs1).toEqual(sampleParsedParagraghs1);
    expect(parsedParagraphs2).toEqual(sampleParsedParagraghs2);
    expect(parsedParagraphs3).toEqual([]);
    done();
  });

  it('returns parsed paragraphs', () => {
    const MockVis =
      '{"viewMode":"view","panels":{"1":{"gridData":{"x":0,"y":0,"w":50,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"c8fc3d30-4c87-11e8-b3d7-01146121b73d"}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"i4cbb9271-464d-11ec-a509-4d69f5227d64","timeRange":{"to":"2021-11-15T19:50:26.477Z","from":"2021-10-16T18:50:26.477Z"},"title":"embed_viz_i4cbb9271-464d-11ec-a509-4d69f5227d64","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}';

    const parsedPara = defaultParagraphParser(
      Array.from({ length: 5 }, (v, k) => {
        const isVisualization = k % 2 === 0;
        return {
          id: `paragraph-${k}`,
          input: {
            inputText: isVisualization ? MockVis : `text-${k}`,
            inputType: isVisualization ? 'VISUALIZATION' : 'MARKDOWN',
          },
          output: [
            {
              result: isVisualization ? '' : `text-${k}`,
              outputType: isVisualization ? 'VISUALIZATION' : 'MARKDOWN',
              execution_time: '0s',
            },
          ],
        };
      })
    );

    const expected = Array.from({ length: 5 }, (v, k) => {
      const isVisualization = k % 2 === 0;
      return {
        uniqueId: `paragraph-${k}`,
        isRunning: false,
        inQueue: false,
        isSelected: false,
        isInputHidden: false,
        isOutputHidden: false,
        showAddPara: false,
        isVizualisation: isVisualization,
        vizObjectInput: isVisualization ? MockVis : '',
        id: k + 1,
        inp: isVisualization ? MockVis : `text-${k}`,
        lang: isVisualization ? 'text/x-' : 'text/x-md',
        editorLanguage: isVisualization ? '' : 'md',
        typeOut: isVisualization ? ['VISUALIZATION'] : ['MARKDOWN'],
        out: isVisualization ? [''] : [`text-${k}`],
        isInputExpanded: false,
        isOutputStale: false,
        paraRef: undefined,
        paraDivRef: undefined,
        visStartTime: isVisualization ? '2021-10-16T18:50:26.477Z' : undefined,
        visEndTime: isVisualization ? '2021-11-15T19:50:26.477Z' : undefined,
        visSavedObjId: isVisualization ? 'c8fc3d30-4c87-11e8-b3d7-01146121b73d' : undefined,
      };
    });
    expect(parsedPara).toEqual(expected);
  });
});

// Issue in schema
describe('Testing default backend parser function with wrong schema', () => {
  test('defaultParagraphParserTest2', (done) => {
    expect(() => {
      const parsedParagraphs1 = defaultParagraphParser(sampleNotebook3.paragraphs);
    }).toThrow(Error);
    expect(() => {
      const parsedParagraphs2 = defaultParagraphParser(sampleNotebook4.paragraphs);
    }).toThrow(Error);
    expect(() => {
      const parsedParagraphs3 = defaultParagraphParser(sampleNotebook5.paragraphs);
    }).toThrow(Error);
    done();
  });
});
