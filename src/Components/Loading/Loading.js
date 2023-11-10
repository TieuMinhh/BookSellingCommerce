import styles from './Loading.module.scss';
import classNames from 'classnames/bind';
import {
    PacmanLoader,
    MoonLoader,
    DotLoader,
    BarLoader,
    BeatLoader,
    BounceLoader,
    CircleLoader,
    ClimbingBoxLoader,
    PuffLoader,
    PulseLoader,
    RingLoader,
    RiseLoader,
    RotateLoader,
    ScaleLoader,
    SkewLoader,
    SquareLoader,
    SyncLoader,
    ClipLoader,
    ClockLoader,
    FadeLoader,
    GridLoader,
    HashLoader,
    PropagateLoader,
} from 'react-spinners';

const cx = classNames.bind(styles);

function Loading({
    moon,
    dot,
    bar,
    beat,
    bounce,
    circle,
    climbingbox,
    puff,
    pulse,
    ring,
    rise,
    rotate,
    scale,
    skew,
    square,
    sync,
    clip,
    clock,
    fade,
    grid,
    hash,
    propagate,
    pacman,
    size,
    color,
}) {
    const defaultSize = 46;
    const defaultColor = '#ed722f';
    const settingSize = `${size || defaultSize}`;
    const settingColor = `${color || defaultColor}`;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {pacman && <PacmanLoader size={settingSize} color={settingColor} />}
                {moon && <MoonLoader size={settingSize} color={settingColor} />}
                {dot && <DotLoader size={settingSize} color={settingColor} />}
                {bar && <BarLoader size={settingSize} color={settingColor} />}
                {beat && <BeatLoader size={settingSize} color={settingColor} />}
                {bounce && <BounceLoader size={settingSize} color={settingColor} />}
                {circle && <CircleLoader size={settingSize} color={settingColor} />}
                {climbingbox && <ClimbingBoxLoader size={settingSize} color={settingColor} />}
                {puff && <PuffLoader size={settingSize} color={settingColor} />}
                {pulse && <PulseLoader size={settingSize} color={settingColor} />}
                {ring && <RingLoader size={settingSize} color={settingColor} />}
                {rise && <RiseLoader size={settingSize} color={settingColor} />}
                {rotate && <RotateLoader size={settingSize} color={settingColor} />}
                {scale && <ScaleLoader size={settingSize} color={settingColor} />}
                {skew && <SkewLoader size={settingSize} color={settingColor} />}
                {square && <SquareLoader size={settingSize} color={settingColor} />}
                {sync && <SyncLoader size={settingSize} color={settingColor} />}
                {clip && <ClipLoader size={settingSize} color={settingColor} />}
                {clock && <ClockLoader size={settingSize} color={settingColor} />}
                {fade && <FadeLoader size={settingSize} color={settingColor} />}
                {grid && <GridLoader size={settingSize} color={settingColor} />}
                {hash && <HashLoader size={settingSize} color={settingColor} />}
                {propagate && <PropagateLoader size={settingSize} color={settingColor} />}
            </div>
        </div>
    );
}

export default Loading;
