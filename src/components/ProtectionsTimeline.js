import React, { useState, useEffect, useContext } from 'react';
import { DataSet, Timeline } from 'vis-timeline/standalone';
import { convertToformat, convertDateToFormat, getNextDayFormatted ,convertFormatToDate } from '../utils/dateUtils';
import { GatewayConfigContext } from '../contexts/GatewayConfigContext'; // Import the context

function ProtectionsTimeline() {
  const { gatewayConfig } = useContext(GatewayConfigContext); // Access the global context
  const [items, setItems] = useState([]);
  const [modalDetails, setModalDetails] = useState(null);

  useEffect(() => {
    const createdItems = createItemsForTimeline(gatewayConfig.history); // Use global history
    setItems(createdItems);
  }, [gatewayConfig.history]);
  

  
  useEffect(() => {
    if (items.length > 0) {
      const timelineItems = new DataSet(items);
      const container = document.getElementById('visualization');

      var currentDate = new Date();
      // edit the current date to have the date of tomorrow
      currentDate.setDate(currentDate.getDate() + 1);

      const timeline = new Timeline(container, timelineItems, {
        width: '100%',
        height: '200px',
        editable: {
          add: false,
          remove: false,
          updateTime: false,
          updateGroup: false,
        },
        margin: {
          item: 10,
          axis: 5,
        },
        orientation: 'bottom',
        end: currentDate,
        zoomMin: 1000 * 60 * 60 * 24 * 3, // min zoom of days
      });

      timeline.on('click', function (properties) {
        if (properties.item) {
          const item = items.find(item => item.id === properties.item);
          if (item) {
            setModalDetails(item);
          }
        }
      });
    }
  }, [items]);

  const closeModal = () => {
    setModalDetails(null);
  };

  return (
    <div className="timeline-container">
      <div id="visualization"></div>
      {modalDetails && (
        <div id="overlay">
          <div id="item-modal">
            <div id="item-details">
              <p className="items-header"><strong>Disabled Protections</strong></p>
              <ul className="items-list">
                {modalDetails.info.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            </div>
            <button className="close-modal" onClick={closeModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

function createItemsForTimeline(history) {
  const timelineMap = new Map();
  let prevDate = "";
  let protectionsSet = new Set();

  for (let i = history.length - 1; i >= 0; i--) {
    const logInfo = history[i];
    const dateKey = convertDateToFormat(logInfo.date);

    if (prevDate === "") {
      timelineMap.set(dateKey, new Set());
      prevDate = dateKey;
    }
    while (dateKey !== prevDate) {
      const dayAfterPrev = getNextDayFormatted(prevDate);
      timelineMap.set(dayAfterPrev, new Set(protectionsSet));
      prevDate = dayAfterPrev;
    }

    let currentData = timelineMap.get(dateKey);

    if (logInfo.status === 'Disabled') {
      if (!currentData.has(logInfo.name)) {
        currentData.add(logInfo.name);
        protectionsSet.add(logInfo.name);
      }
    } else if (logInfo.status === 'Enabled') {
      if (currentData.has(logInfo.name)) {
        protectionsSet.delete(logInfo.name);
      }
    }
  }

  if (protectionsSet.size > 0) {
    let currentDate = new Date();
    let formatedDate = convertToformat(currentDate);
    while (formatedDate !== prevDate) {
      const dayAfterPrev = getNextDayFormatted(prevDate);
      timelineMap.set(dayAfterPrev, new Set(protectionsSet));
      prevDate = dayAfterPrev;
    }
  }

  const items = [];
  let idCounter = 1;

  timelineMap.forEach((protectionsSet, dateKey) => {
    const infoArray = Array.from(protectionsSet);
    if (infoArray.length > 0) {
      var protectionDate = convertFormatToDate(dateKey)
      items.push({
        id: idCounter,
        content: String(infoArray.length),
        start: protectionDate,
        info: infoArray,
        className: 'custom-item',
      });
      idCounter++;
    }
  });

  return items;
}

export default ProtectionsTimeline;
