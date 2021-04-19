/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import { zeppelinParagraphParser } from '../helpers/zeppelin_parser';
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
  test('zeppelinParagraphParserTest1', async (done) => {
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
  test('zeppelinParagraphParserTest2', async (done) => {
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
