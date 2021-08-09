import { EuiBreadcrumb } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { ChromeBreadcrumb, CoreStart } from '../../../../../src/core/public';
import { DashboardStart } from '../../../../../src/plugins/dashboard/public';
import {
  CUSTOM_PANELS_API_PREFIX,
  CUSTOM_PANELS_DOCUMENTATION_URL,
} from '../../../common/constants/custom_panels';

// "CustomPanelsView" module used to render saved Custom Operational Panels

type Props = {
  panelId: string;
  http: CoreStart['http'];
  chrome: CoreStart['chrome'];
  parentBreadcrumb: {text: string, href: string}[];
};

export const CustomPanelView = ({
  panelId, http, chrome, parentBreadcrumb
}: Props) => {
  const [openPanelName, setOpenPanelName] = useState("")

  const fecthCustomPanel = () => {

  }

  useEffect(() => {
    fecthCustomPanel();
    chrome.setBreadcrumbs([...parentBreadcrumb, {text: openPanelName, href: `/:${panelId}`}]); 
  }, []);

  return <div></div>;
};
