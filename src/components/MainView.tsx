import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import markdownContent from '../markdown/message.md';
import encryptedMarkdownContent from '../markdown/message-input';

import Reader from './Reader';
import Encrypt from './Encrypt';

const MainView: React.FC = () => {
  const [secretKey, setSecretKey] = useState(
    'EZPMNg19bhjRkn522eX6877hM1F8t/pr7tTIUVDyD1A='
  );
  const [plaintext, setPlaintext] = useState(() => markdownContent);
  const [cryptogram, setCryptogram] = useState(() => encryptedMarkdownContent);

  return (
    <Tabs>
      <TabList>
        <Tab>Reader</Tab>
        <Tab>Encrypt</Tab>
      </TabList>
      <TabPanel>
        <Reader
          cryptogram={cryptogram}
          secretKey={secretKey}
          setSecretKey={setSecretKey}
          plaintext={plaintext}
          setPlaintext={setPlaintext}
        />
      </TabPanel>
      <TabPanel>
        <Encrypt
          secretKey={secretKey}
          setSecretKey={setSecretKey}
          plaintext={plaintext}
          setPlaintext={setPlaintext}
          cryptogram={cryptogram}
          setCryptogram={setCryptogram}
        />
      </TabPanel>
    </Tabs>
  );
};

export default MainView;
