/**xét lại title cho trang */
function Helmet(props){
        document.title = props.title
    return (
        <>
            {props.children}
        </>
    );
};
export default Helmet
