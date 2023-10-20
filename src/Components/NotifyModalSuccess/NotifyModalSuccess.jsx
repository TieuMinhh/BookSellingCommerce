import './NotifyModalSuccess.scss';

export function NotifyModalSuccess({ isSuccess, detailNoti, detailNotiSecond }) {
    return (
        <>
            {isSuccess && (
                <div className="modal-add-success">
                    <div className="modal-container-success">
                        <div className="cover-icon-success">
                            <i
                                className="fa-solid fa-check detail-icon-success"
                                style={{ color: '#fff', lineHeight: '60px' }}
                            ></i>
                        </div>
                        <p className="sub-a-success" style={{ color: '#fff' }}>
                            {detailNoti}
                        </p>
                        {detailNotiSecond && (
                            <p className="sub-a-success" style={{ color: '#fff' }}>
                                {detailNotiSecond}
                                <i
                                    className="fa-solid fa-heart"
                                    style={{ color: 'red', fontSize: '1.6rem', marginLeft: '8px' }}
                                ></i>
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
