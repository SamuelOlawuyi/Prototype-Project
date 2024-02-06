import {useState} from 'react'

export default function CreateStoryModal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  }

    return (
        <>
          <button className='btn-modal' onClick={toggleModal}>
            Open
          </button>

          <div className='modal'>
            <div className='overlay'></div>
          </div>
        </>
    )
}