import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import useNonce from '../hooks/useNonce';
import encryptedMarkdownContent from '../markdown/message-input';

import Reader from './Reader';
import Encrypt from './Encrypt';

const MainView: React.FC = () => {
  const [nonce, setNonce] = useNonce();
  const [secretKey, setSecretKey] = useState(
    'EZPMNg19bhjRkn522eX6877hM1F8t/pr7tTIUVDyD1A='
  );
  const [plaintext, setPlaintext] = useState('');
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
          nonce={nonce}
          secretKey={secretKey}
          setSecretKey={setSecretKey}
          plaintext={plaintext}
          setPlaintext={setPlaintext}
        />
      </TabPanel>
      <TabPanel>
        <Encrypt
          nonce={nonce}
          setNonce={setNonce}
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
