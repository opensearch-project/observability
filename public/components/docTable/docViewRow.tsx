import React, { useState } from 'react';
import _ from 'lodash';
import { EuiIcon } from '@elastic/eui';
import { DocViewer } from './docViewer';
import { DocDetailTitle } from './detailTable/docDetailTitle';

export const DocViewRow = (props: any) => {

  const {
    doc,
    selectedCols = [],
    plugins
  } = props;

  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

  const getTdTmpl = (conf: { clsName: string, content: React.ReactDOM | string }) => {
    const {
      clsName,
      content
    } = conf;
    return (
      <td
        className={ clsName }
      >
        { content }
      </td>);
  };

  const getDlTmpl = (conf) => {
    const {
      doc
    } = conf;

    return (
      <div className="truncate-by-height">
        <span>
          <dl className="source truncate-by-height">
            { _.toPairs(doc).map((entry) => {
              return (
                <>
                  <dt>{ entry[0] }:</dt>
                  <dd>
                    <span>
                      { entry[1] }
                    </span>
                  </dd>
                </>
              );
            })}
          </dl>
        </span>
      </div>
    );
  };

  const getDiscoverSourceLikeDOM = (doc) => {
    return getDlTmpl({ doc, });
  };

  const toggleDetailOpen = () => {
    const newState = !detailsOpen;
    setDetailsOpen(newState);
  };

  const getExpColapTd = () => {
    return (
      <td
        className="kbnDocTableCell__toggleDetails"
      >
        <button
          className="euiButtonIcon euiButtonIcon--text"
          onClick={ () => { toggleDetailOpen() } }
        >
          { detailsOpen ?  <EuiIcon type="arrowDown" /> : <EuiIcon type="arrowRight" /> }
        </button>
      </td>
    );
  };

  const getTds = (doc, selectedCols) => {
    const cols = [];
    const fieldClsName = 'kbnDocTableCell__dataField eui-textBreakAll eui-textBreakWord';
    const timestampClsName = 'eui-textNoWrap';
    
    // No field is selected
    if (!selectedCols || selectedCols.length === 0) {
      if (_.has(doc, 'timestamp')) {
        cols.push(
          getTdTmpl({ 
            clsName: timestampClsName,
            content: doc['timestamp']
          })
        );
      }
      const _sourceLikeDOM = getDiscoverSourceLikeDOM(doc);
      cols.push(
        getTdTmpl({
          clsName: fieldClsName,
          content: _sourceLikeDOM
        })
      );
    } else {
      
      // Has at least one field selected
      _.forEach(doc, (val, key) => {
        if (key === 'timestamp') {
          // Always append timestamp to the leftmost of the table
          cols.unshift(
            getTdTmpl({ 
              clsName: timestampClsName,
              content: val
            })
          );
          return;
        }
        cols.push(
          getTdTmpl({ 
            clsName: fieldClsName,
            content: val
          })
        );
      });
    }

    // Add detail toggling column
    cols.unshift(
      getExpColapTd()
    );
    return cols;
  };

  return (
    <>
      <tr
        className="kbnDocTable__row"
      >
        { getTds(doc, selectedCols) }
      </tr>
      { detailsOpen ? <tr className="kbnDocTableDetails__row">
        <td colSpan={3}>
          <DocDetailTitle />
          <DocViewer
            hit={ doc }
            plugins={ plugins }
          />
        </td>
      </tr> : null }
    </>
  );
};