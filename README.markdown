# input 欄位數字輸入限制

* type: 'num' 只能輸入數字
        'fnum' 可輸入浮點數
* intLen: 整數位長度, 預設0不限制
* floatLen: 小數位長度，預設0不限制

## Example code

```
$('#input_digit').digitLength({type: 'num', intLen: 8});
$('#input_float').digitLength({type: 'fnum', intLen: 3, floatLen: 4});
```


## Demo

[demo](http://jsfiddle.net/lighter/mphtu5n5/)
