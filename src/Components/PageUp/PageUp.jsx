import './PageUp.scss';
import PageUpImg from '../../Assets/img/page_up.png';

export default function PageUp() {
    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="wrapper-pageup" onClick={scrollUp}>
            <img src={PageUpImg} alt="" className="img-pageup" />
        </div>
    );
}
