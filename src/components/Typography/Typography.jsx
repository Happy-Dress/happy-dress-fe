import s from './Typography.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Typography = (props) => {
    const { classNames: classes = [], children } = props;
    return (
        <span className={classNames( s.Typography, classes)}>{children}</span>
    );
};

Typography.propTypes = {
    children: PropTypes.any,
    classNames: PropTypes.array,
};

export default Typography;
