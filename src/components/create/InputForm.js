import { useState } from "react";

function InputForm({dataTest}) {
	const data = dataTest();

	const [inputName, setInputName] = useState(data.name);
	const [inputPhone, setInputPhone] = useState(data.phone);
	const [inputEmail, setInputEmail] = useState(data.email);
	const [selectCourse, setSelectCourse] = useState(data.product);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);


	const resetInputsValue = () => {
		setInputName('');
		setInputPhone('');
		setInputEmail('');
		setSelectCourse('');
	};

	function formatDate() {
		const date = new Date();

		const dd = date.getDate();
		if (dd < 10) dd = '0' + dd;
	  
		const mm = date.getMonth() + 1;
		if (mm < 10) mm = '0' + mm;
	  
		const yy = date.getFullYear();
		
		return dd + '.' + mm + '.' + yy;
	  }

	const formSubmit = (e) => {
		e.preventDefault();
		

		const dataInputs = {
			name: inputName, 
			phone: inputPhone,
			email: inputEmail,
			course: selectCourse,
			status: 'new',
			date: formatDate()
		}
		setLoading(true);

		fetch('http://localhost:8000/applications', {
			method: 'POST',
			headers: {"Content-type": "Application/json"},
			body: JSON.stringify(dataInputs)
		}).then(() => {
			setLoading(false);
			resetInputsValue();
			dataTest();
		}).catch(() => {
			setError(true);
			setLoading(false);
		});
	};

    return (
        <form onSubmit={formSubmit} id="form" method="POST" action="">
		    <label>Ваши данные:</label>
		    <div className="form-group">
		    	<input onChange={(e) => {setInputName(e.target.value)}} value={inputName} id="name" type="text" name="name" autoComplete="on" className="form-control" placeholder="Имя и Фамилия" required/>
		    </div>
		    <div className="form-group">
		    	<input onChange={(e) => {setInputPhone(e.target.value)}} value={inputPhone} id="phone" type="text" name="phone" autoComplete="on" className="form-control" placeholder="Телефон"/>
		    </div>
		    <div className="form-group">
		    	<input onChange={(e) => {setInputEmail(e.target.value)}} value={inputEmail} id="email" type="email" name="email" autoComplete="on" className="form-control" placeholder="Email" required/>
		    </div> 
		    <div className="form-group">
		    	<label htmlFor="exampleFormControlSelect1">Продукт:</label>
		    	<select onChange={(e) => {setSelectCourse(e.target.value)}} value={selectCourse} id="product" name="product" className="form-control">
		    		<option value="course-html">Курс по верстке</option>
		    		<option value="course-js">Курс по JavaScript</option>
		    		<option value="course-vue">Курс по VUE JS</option>
		    		<option value="course-php">Курс по PHP</option>
		    		<option value="course-wordpress">Курс по WordPress</option>
		    	</select>
		    </div>
		    <div className="form-group">
				{loading && <button disabled type="submit" className="btn btn-lg btn-primary btn-block">Отправка заявки...</button>}
				{!loading && <button type="submit" className="btn btn-lg btn-primary btn-block">Оформить заявку</button>}
				{error && <h1>error to fetch</h1>}
		    </div>
		</form>
    );
}

export default InputForm;