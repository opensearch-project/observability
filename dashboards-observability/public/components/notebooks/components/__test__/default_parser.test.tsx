/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { defaultParagraphParser } from '../helpers/default_parser';
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
