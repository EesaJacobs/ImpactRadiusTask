//initialize a index object that
//returns a JSON object of various
//methods applicable to index.js

var index = function(){

	function getInputValueAsString(){
		var inputValueAsString = document.getElementById("txtInput").value;

		return inputValueAsString.replace(/ /g, "");
	}

	function getInputValueAsArray(){
		var inputValueAsString = getInputValueAsString();
		var inputValueAsArray = inputValueAsString.split(",").map(Number);

		return inputValueAsArray;
	}

	function btnPrintInput_onClick(){
		writeToOutput("Input value: " + getInputValueAsString());
	}

	function sortArrayAndWriteOutput(array, sortFn){

		//testing
		var timeStampStart = Date.now();

		//sort items in array
		sortFn(array);

		//testing
		var timeStampEnd = Date.now();
		var timeStampDiff = timeStampEnd - timeStampStart;

		writeToOutput("Input sorted("+ timeStampDiff +"ms): " + array);
	}

	function btnSelectionSortInput_onClick(){
		var inputValueAsArray = getInputValueAsArray();
		var fn = algorithms.arraySortAlgorithms.insertionSort;

		sortArrayAndWriteOutput(inputValueAsArray, fn);
	}

	function btnSelectionSortAndAggregateInput_onClick(){

		var inputValueAsArray = getInputValueAsArray();
		var aggregatedArray = sortAndAggregateArrayIntoRanges(inputValueAsArray);
		writeToOutput("Input sorted & aggregated: " + aggregatedArray);
	}

	function sortAndAggregateArrayIntoRanges(unsortedArray){
		var fn = algorithms.arraySortAlgorithms.insertionSort;

		//sort the array
		sortArrayAndWriteOutput(unsortedArray, fn);

		//unsortedArray is now sorted.
		//place into new variable just for naming sake
		var sortedArray = unsortedArray;

		var aggregatedArray = aggregateSortedArrayIntoRanges(sortedArray);
		return aggregatedArray;
	}

	function aggregateSortedArrayIntoRanges(sortedArray){
		var output = [];
		var temp = null;

		for(var i = 0, l = sortedArray.length; i<l;i++){

			var previousNumber = sortedArray[i -1];
			var currentNumber = sortedArray[i];
			var nextNumber = sortedArray[i +1];

			if(currentNumber == nextNumber || temp == currentNumber) //duplicate
				continue;

			if(currentNumber == nextNumber -1){//next number is sequential
				temp = (temp == null ? currentNumber : temp);
				continue;
			}

			if(temp != null){
				//set the next item in output
				//with the initial item for this
				//aggregation and the current number i.e. start and end items
				output[output.length] = temp + "-" + currentNumber;
				temp = null;
			}
			else{
				//set the next item in output
				output[output.length] = currentNumber;
			}
		}

		temp = null; //memory dealloc
		return output;
	}


	function writeToOutput(text){
		var logger = document.getElementById("output");


		var timeStamp = new Date().toLocaleTimeString();
		var html = "<br/><div><span style='font-style: italic;'>["+ timeStamp +"]</span>" + text + "</div>";
		logger.innerHTML = (html + logger.innerHTML);

		logger.scrollTop = 0; //always show most recently logged
	}

	return{
		btnPrintInput_onClick: btnPrintInput_onClick,
		btnSelectionSortInput_onClick: btnSelectionSortInput_onClick,
		btnSelectionSortAndAggregateInput_onClick: btnSelectionSortAndAggregateInput_onClick
	};
}();