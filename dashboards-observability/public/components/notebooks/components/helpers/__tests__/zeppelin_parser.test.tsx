/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { zeppelinParagraphParser } from '../zeppelin_parser';
import {
  sampleNotebook1,
  sampleNotebook2,
  sampleNotebook3,
  sampleNotebook4,
  sampleNotebook5,
  sampleParsedParagraghs1,
  sampleParsedParagraghs2,
} from './sampleZeppelinNotebooks';

// Perfect schema
describe('Testing Zeppelin backend parser function with perfect schema', () => {
  test('zeppelinParagraphParserTest1', (done) => {
    const parsedParagraphs1 = zeppelinParagraphParser(sampleNotebook1.paragraphs);
    const parsedParagraphs2 = zeppelinParagraphParser(sampleNotebook2.paragraphs);
    const parsedParagraphs3 = zeppelinParagraphParser([]);
    expect(parsedParagraphs1).toEqual(sampleParsedParagraghs1);
    expect(parsedParagraphs2).toEqual(sampleParsedParagraghs2);
    expect(parsedParagraphs3).toEqual([]);
    done();
  });
});

// Issue in schema
describe('Testing default backend parser function with wrong schema', () => {
  test('zeppelinParagraphParserTest2', (done) => {
    expect(() => {
      const parsedParagraphs1 = zeppelinParagraphParser(sampleNotebook3.paragraphs);
    }).toThrow(Error);
    expect(() => {
      const parsedParagraphs2 = zeppelinParagraphParser(sampleNotebook4.paragraphs);
    }).toThrow(Error);
    expect(() => {
      const parsedParagraphs3 = zeppelinParagraphParser(sampleNotebook5.paragraphs);
    }).toThrow(Error);
    done();
  });
});
