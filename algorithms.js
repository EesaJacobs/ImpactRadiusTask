var algorithms = function()
{
	var arraySortAlgorithms = function(){

		function insertionSort(arr)
		{
			for (var i = 1; i < arr.length; i++)
			{
				var index = arr[i];
				var j = i;
				while (j > 0 && arr[j-1] > index)
				{
					arr[j] = arr[j-1];
					j--;
				}
				arr[j] = index;
			}
		}

		function bubbleSort(arr)
		{
			for (var i = (arr.length - 1); i >= 0; i--)
			{
				for (var j = 1; j < i; j++)
				{
					if (arr[j-1] > arr[j])
					{
						var temp = arr[j-1];
						arr[j-1] = arr[j];
						arr[j] = temp;
					}
				}
			}
		}

		return {
			insertionSort: insertionSort,
			bubbleSort: bubbleSort
		}
	}

	return {
		arraySortAlgorithms: arraySortAlgorithms()
	}
}();