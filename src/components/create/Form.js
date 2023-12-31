import InputForm from "./InputForm";
import dataTest from "./dataTest.js";

function Form() {
    return (
        <div>
	        <div className="white-plate white-plate--payment">
		        <div className="container-fluid">
		    	    <div className="white-plate__header text-center">
		    	    	<p className="white-plate__logo">
		    	    		<span>Форма</span> заявок
		    	    	</p>
		    	    </div>
        
		    	    <div className="white-plate__line-between white-plate__line-between--main"></div>

		    	    <InputForm dataTest={dataTest}/>

		        </div>
	        </div>
        </div>
    );
}

export default Form;