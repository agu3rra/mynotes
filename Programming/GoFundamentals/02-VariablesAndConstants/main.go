package main

import (
	"fmt"
	"reflect"
)

func main() {

	name, course := "m4rbl3", "Go Funds"
	module := 3.4
	ptr := &name

	fmt.Println("Name is", name, "and is of type", reflect.TypeOf(name))
	fmt.Println("Module is", module, "and is of type", reflect.TypeOf(module))
	fmt.Println("Course is", course)
	fmt.Println("Memory address of name is", ptr, "and value of *name* is", *&name)
}
