import PropTypes from 'prop-types'

const Button = ({color, text, onClick}) => {

    return  (
        <button onClick={onClick} style={{backgroundColor: color}}
        className='btn'>
            {text}
        </button>
    )
}

Button.defaultProps ={
    color: 'steelblue'
}

//Proptypes is a library used to check types passed in the props
//object against specification we ser beforehand and to raise
//a warning if the types passed dont match the types expected
Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button
