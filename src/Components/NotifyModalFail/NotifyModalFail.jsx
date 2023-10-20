import './NotifyModalFail.scss';

export function NotifyModalFail({ isFail, detailNoti }) {
    return (
        <>
            {isFail && (
                <div className="modal-add-success">
                    <div className="modal-container-success">
                        <div className="cover-icon-success">
                            <i
                                className="fa-solid fa-xmark detail-icon-fail"
                                style={{ color: '#fff', lineHeight: '58px' }}
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
