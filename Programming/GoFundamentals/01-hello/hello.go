package main

// line comments
import (
	"fmt"
	"runtime"
)

func main() {
	fmt.Println("Hello from", runtime.GOOS)
}
