package main

import (
	"context"
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/lambda"
)

func handler(ctx context.Context) (string, error) {
	jwt := os.Getenv("JWT_SECRET")
	return fmt.Sprintf("JWT_SECRET is: %s", jwt), nil
}

func main() {
	lambda.Start(handler)
}
