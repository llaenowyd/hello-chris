import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { RecoilRoot, useRecoilState } from 'recoil';
import 'react-tabs/style/react-tabs.css';

import { useSyncEffects } from '../hooks/useSyncEffects';
import { store } from '../store';

import Reader from './Reader';
import Encrypt from './Encrypt';
import { useErrorBoundary } from 'react-use-error-boundary';

const UnconnectedMainView: React.FC = () => {
  const [tabIndex, setTabIndex] = useRecoilState(store.tabIndex);

  useSyncEffects();

  return (
    <Tabs selectedIndex={tabIndex} onSelect={setTabIndex}>
      <TabList>
        <Tab>Reader</Tab>
        <Tab>Encrypt</Tab>
      </TabList>
      <TabPanel>
        <Reader />
      </TabPanel>
      <TabPanel>
        <Encrypt />
      </TabPanel>
    </Tabs>
  );
};

const RawMainView: React.FC = () => (
  <RecoilRoot>
    <React.Suspense fallback={<div>⏰</div>}>
      <UnconnectedMainView />
    </React.Suspense>
  </RecoilRoot>
);

const MainView: React.FC = () => {
  const [error] = useErrorBoundary();

  return error ? (
    <div>
      Error:{' '}
      {(error as Error)?.message ?? (error as object)?.toString?.() ?? error}
    </div>
  ) : (
    <RawMainView />
  );
};

export default MainView;
