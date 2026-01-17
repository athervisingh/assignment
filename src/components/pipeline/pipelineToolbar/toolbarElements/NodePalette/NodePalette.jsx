import { useState } from 'react';
import { NODE_GROUPS } from '../../../../../config/nodeGroup';
import { NODE_CONFIG } from '../../../../../config/nodeConfig';
import { DraggableNode } from '../../../../nodes/base/draggableNode/DraggableNode';

import './NodePalette.css'; // Import CSS file

export const NodePalette = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Filter nodes based on tab + search
    const getFilteredNodes = () => {
        let nodes = Object.entries(NODE_CONFIG);

        // Tab filter
        if (activeTab !== 'all') {
            const tabNodes = NODE_GROUPS[activeTab] || [];
            nodes = nodes.filter(([type]) => tabNodes.includes(type));
        }

        // Search filter
        if (searchTerm) {
            nodes = nodes.filter(([_, config]) =>
                config.label.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return nodes;
    };

    const filteredNodes = getFilteredNodes();


    // ... same logic as before ...

    return (
        <div className="node-palette">
            {/* Search Bar */}
            <div className="node-palette-header">
                <div className="search-bar">
                    <img src="/pngs/search.png" alt="search icon" className='search-icon' />
                    <input
                        type="text"
                        placeholder="Search nodes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Tabs */}
                <div className="node-palette-tabs">
                    {Object.entries(NODE_GROUPS).map(([tabKey]) => {
                        let label;
                        label = tabKey
                            .replace(/-/g, ' ')           // 'knowledge-ai' -> 'knowledge ai'
                            .replace(/^\w/, c => c.toUpperCase()); // Sirf first letter capitalize


                        return (
                            <button
                                key={tabKey}
                                className={`tab-btn ${activeTab === tabKey ? 'active' : ''}`}
                                onClick={() => setActiveTab(tabKey)}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>


            </div>

            {/* Nodes Grid */}
            <div className="nodes-grid">
                {filteredNodes.length > 0 ? (
                    filteredNodes.map(([type, config]) => (
                        <DraggableNode
                            key={type}
                            type={type}
                            label={config.label}
                            icon={config.icon}
                        />
                    ))
                ) : (
                    <div className="empty-state">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        No nodes found
                    </div>
                )}
            </div>
        </div>
    );
};
