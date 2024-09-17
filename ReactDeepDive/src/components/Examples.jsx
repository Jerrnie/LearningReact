import TabButton from './TabButton.jsx';

import Section from './Section.jsx';
import Tabs from './Tabs.jsx';
import { useState } from 'react';
import { EXAMPLES } from '../data.js';  

export default function Examples() {

    const [selectedTopic, setSelectedTopic] = useState();

    function handleSelect(selectedButton) {
      setSelectedTopic(selectedButton);
    }
    
    let tabContent = <p>Please select a topic.</p>;
    
    if (selectedTopic) {
      tabContent = (
        <div id="tab-content">
          <h3>{EXAMPLES[selectedTopic].title}</h3>
          <p>{EXAMPLES[selectedTopic].description}</p>
          <pre>
            <code>{EXAMPLES[selectedTopic].code}</code>
          </pre>
        </div>
      );
    }

    return (
        <Section title="Examples" id="examples">
            <Tabs 
            buttonsContainer="menu"
            buttons=
            {
                <>
                    <TabButton
                        isSelected={selectedTopic === 'counter'}
                        onClick={() => handleSelect('counter')}
                    >
                        Counter
                    </TabButton>
                    <TabButton
                        isSelected={selectedTopic === 'toggle'}
                        onClick={() => handleSelect('toggle')}
                    >
                        Toggle
                    </TabButton>
                    <TabButton
                        isSelected={selectedTopic === 'input'}
                        onClick={() => handleSelect('input')}
                    >
                        Input
                    </TabButton>
                </>
            }
            >
                {tabContent}
            </Tabs>
        </Section> 
    );
}