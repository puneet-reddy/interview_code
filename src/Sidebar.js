import { useState, useEffect } from 'react';
import Modal from './Modal';
import BarChart from './BarChart';

function Sidebar() {
  const [selectedValue, setSelectedValue] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGraphShown, setIsGraphShown] = useState(false);
  const [data, setData] = useState([1, 2, 3]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Generating dummy data for the graph
    const timer = setTimeout(() => setCount(count + 1), 50);
    if (data.length < 100) {
      data.push(Math.random());
    } else {
      const newData = data.splice(1, 100);
      setData(newData);
    }
    return () => clearTimeout(timer);
  }, [count, setCount, data]);

  const handleGraphGeneration = () => {
    setIsGraphShown(true);
  };

  const dimensions = {
    height: 600,
    width: 800
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleGraphClose = () => {
    setIsGraphShown(false);
  };

  function handleChecked(selected) {
    if (selectedValue.includes(selected)) {
      setSelectedValue(selectedValue.filter((e) => e !== selected));
    } else {
      setSelectedValue(Array.from([selected, ...selectedValue]));
    }
  }

  function handleChannelSelection(e) {
    e.preventDefault();
    handleModalOpen();
  }

  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}>
        <div>
          <label>Channel1</label>
          <input type="checkbox" id="Channel1" value="Channel1" checked={selectedValue.includes('Channel1')} onChange={() => handleChecked('Channel1')} />
        </div>
        <div>
          <label>Channel2</label>
          <input type="checkbox" id="Channel2" value="Channel2" checked={selectedValue.includes('Channel2')} onChange={() => handleChecked('Channel2')} />
        </div>
        <div>
          <label>Channel3</label>
          <input type="checkbox" id="Channel3" value="Channel3" checked={selectedValue.includes('Channel3')} onChange={() => handleChecked('Channel3')} />
        </div>
        <button type="submit" onClick={handleChannelSelection} style={{ width: '5em', margin: 'auto' }}>
          Submit
        </button>
      </form>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <button>Select Frequency</button>
        <button>Select Amplitude</button>
        <button type="submit" onClick={handleGraphGeneration}>
          Generate Graph
        </button>
      </Modal>
      {isGraphShown && (
        <div onClick={handleGraphClose}>
          <BarChart data={data} dimensions={dimensions}></BarChart>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
