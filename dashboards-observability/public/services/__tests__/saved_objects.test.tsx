/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SavedObjects from '../saved_objects/event_analytics/saved_objects';
import { coreStartMock } from '../../../test/__mocks__/coreMocks';
import {
  NEW_SAVED_QUERY_OBJECT,
  UPDATED_SAVED_QUERY_OBJECT,
  NEW_SAVED_VISUALIZATION_OBJECT,
  UPDATED_SAVED_VISUALIZATION_OBJECT,
  BULK_UPDATE_PANEL_OBJECT,
} from '../../../test/saved_objects';

describe('Saved Object', () => {
  configure({ adapter: new Adapter() });

  it('Renders saved object class', async () => {
    const core = coreStartMock;
    const savedObject = new SavedObjects(core.http);
    savedObject.fetchSavedObjects({
      objectType: ['savedQuery', 'savedVisualization'],
      sortOrder: 'desc',
      fromIndex: 0,
    });
    savedObject.createSavedVisualization(NEW_SAVED_VISUALIZATION_OBJECT);
    savedObject.updateSavedVisualizationById(UPDATED_SAVED_VISUALIZATION_OBJECT);
    savedObject.bulkUpdateCustomPanel(BULK_UPDATE_PANEL_OBJECT);
    savedObject.updateSavedQueryById(UPDATED_SAVED_QUERY_OBJECT);
    savedObject.createSavedQuery(NEW_SAVED_QUERY_OBJECT);
  });
});
