import './NotifyModalSuccess.scss';

export function NotifyModalSuccess({ isSuccess, detailNoti }) {
    return (
        <>
            {isSuccess && (
                <div className="modal-add-success">
                    <div className="modal-container-success">
                        <div className="cover-icon-success">
                            <i
                                class="fa-solid fa-check detail-icon-success"
                                style={{ color: '#fff', lineHeight: '60px' }}
                            ></i>
                        </div>
                        <p className="sub-a-success" style={{ color: '#fff' }}>
                            {detailNoti}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
