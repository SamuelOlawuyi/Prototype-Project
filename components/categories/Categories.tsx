import './Categories.css'
// import { useState } from 'react';
// import  CreateSpaceform from './../modals/createSpace/CreateSpace'

export default function Categories() {
  // const [spaceModal, spaceModalVisible] = useState(false);

  // const toggleSpaceModal = () => {
  //   spaceModalVisible(!spaceModal);
  // };

  return (
    <div>
        {/* {spaceModal && <CreateSpaceform setOpenModal={spaceModalVisible} />}
      <div className='Space_Categories' onClick={toggleSpaceModal}>
        <img src="/src/assets/images/users.png" alt="SpacesIcon" />
        <h4>Spaces</h4>
      </div> */}
      <div>
        <p>CATEGORIES</p>
        <ul>
          <li>Python</li>
          <li>Node JS</li>
          <li>Java</li>
          <li>Python1</li>
          <li>Python5</li>
        </ul>
      </div>
    </div>
  );
}
