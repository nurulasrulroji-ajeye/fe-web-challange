import React from 'react';
import { motion } from 'framer-motion';

export type TTabs = {
  id: string;
  name: string;
  icon?: React.JSX.Element;
};

type TabsProps = {
  data: TTabs[];
  layoutId: string;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export const Tabs = ({ data, activeTab, layoutId, setActiveTab }: TabsProps) => {
  return (
    <div className="flex w-full rounded-full py-1 px-1 gap-4">
      {data.map((tab, idx) => (
        <button
          key={idx}
          onClick={() => setActiveTab(tab.id)}
          className={`${
            activeTab === tab.id ? 'px-8' : 'hover:text-red-primary/60 '
          } relative text-sm font-semibold text-center rounded-full py-2 text-red-primary flex items-center justify-center `}
          style={{
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {activeTab === tab.id && (
            <React.Fragment>
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 z-10 bg-red-primary "
                style={{ borderRadius: 9999 }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
              <span className="absolute inset-0 text-white-color z-20 flex justify-center items-center ">
                {tab.icon ? <span className="mr-2">{tab.icon}</span> : null}
                {tab.name}
              </span>
            </React.Fragment>
          )}
          {tab.icon ? <span className="mr-2">{tab.icon}</span> : null}
          {tab.name}
        </button>
      ))}
    </div>
  );
};
