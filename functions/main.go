package main

import (
    "context"
    "fmt"
    "github.com/aws/aws-lambda-go/lambda"
    "os"
)

func handler(ctx context.Context) (string, error) {
    jwtSecret := os.Getenv("JWT_SECRET")
    return fmt.Sprintf("JWT Secret is: %s", jwtSecret), nil
}

func main() {
    lambda.Start(handler)
}
