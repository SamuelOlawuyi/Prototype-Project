
interface Props {
  children: React.ReactNode;
  id: string;
  title: string;
  closeModal: (id: string) => void;
}

export default function FormModal({ id, children, closeModal, title }: Props) {
  return (
    <div className={`modal fade`} id={id} data-bs-backdrop={'static'} data-bs-keyboard={"false"} tabIndex={-1}
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">{title}</h1>
            <button onClick={() => closeModal(id)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          {children}
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  )
}