package main

import (
	"fmt"
	"runtime"
	"sync"
	"time"
)

func main() {

	//Increase number of virtual processors (parallelism)
	runtime.GOMAXPROCS(2)

	var waitGrp sync.WaitGroup
	waitGrp.Add(2) //adds 2 routines

	go func() {
		defer waitGrp.Done()

		time.Sleep(5 * time.Second)
		fmt.Println("Hello there! I am awake!")
	}()

	go func() {
		defer waitGrp.Done()
		fmt.Println("I am executing now.")
	}()

	waitGrp.Wait() // Tells main to wait till all processes are done
}
