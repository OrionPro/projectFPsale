import ReactDOM from 'react-dom';
import React from 'react';

 function App ({name,who}) {
	return (
	  <h2>{name}
		  <span>{who}</span>
	  </h2>
	)
}
ReactDOM.render(
	<App name = "Здесь работает " who="React"/>,
  document.getElementById('app')
);