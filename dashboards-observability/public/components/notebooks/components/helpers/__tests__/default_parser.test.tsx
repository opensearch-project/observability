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
    const MockVis = sampleNotebook1.paragraphs[2].input.inputText;

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
        visStartTime: isVisualization ? '2020-07-21T18:37:44.710Z' : undefined,
        visEndTime: isVisualization ? '2020-08-20T18:37:44.710Z' : undefined,
        visSavedObjId: isVisualization ? '935afa20-e0cd-11e7-9d07-1398ccfcefa3' : undefined,
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
