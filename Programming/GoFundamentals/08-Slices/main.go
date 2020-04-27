package main

import "fmt"

func main() {
	mySlice := []int{1,2,3,4,5,6,7}
	fmt.Println(mySlice)

	sliceCopy := mySlice[2:5]
	fmt.Println(sliceCopy)

	sliceCopy[0] = 42
	fmt.Println(sliceCopy)
	fmt.Println(mySlice)
}
