package main

import (
	"fmt"
	"os"

	"github.com/urfave/cli/v2"
)

func main() {
	app := &cli.App{
		Name:    "hyperio",
		Usage:   "A CLI for managing hyperio ui",
		Version: "1.0.0",
		Commands: []*cli.Command{
			{
				Name:    "list",
				Aliases: []string{"ls"},
				Usage:   "List all trading bots",
				Action: func(c *cli.Context) error {
					fmt.Println("Listing all trading bots...")
					return nil
				},
			},
			{
				Name:    "create",
				Aliases: []string{"c"},
				Usage:   "Create a new trading bot",
				Flags: []cli.Flag{
					&cli.StringFlag{
						Name:     "name",
						Usage:    "Name of the trading bot",
						Required: true,
					},
					&cli.StringFlag{
						Name:     "strategy",
						Usage:    "Trading strategy to use",
						Required: true,
					},
				},
				Action: func(c *cli.Context) error {
					name := c.String("name")
					strategy := c.String("strategy")
					fmt.Printf("Creating new trading bot '%s' with strategy '%s'...\n", name, strategy)
					return nil
				},
			},
			{
				Name:    "start",
				Aliases: []string{"s"},
				Usage:   "Start a trading bot",
				Flags: []cli.Flag{
					&cli.StringFlag{
						Name:     "name",
						Usage:    "Name of the trading bot to start",
						Required: true,
					},
				},
				Action: func(c *cli.Context) error {
					name := c.String("name")
					fmt.Printf("Starting trading bot '%s'...\n", name)
					return nil
				},
			},
			{
				Name:    "stop",
				Aliases: []string{"x"},
				Usage:   "Stop a trading bot",
				Flags: []cli.Flag{
					&cli.StringFlag{
						Name:     "name",
						Usage:    "Name of the trading bot to stop",
						Required: true,
					},
				},
				Action: func(c *cli.Context) error {
					name := c.String("name")
					fmt.Printf("Stopping trading bot '%s'...\n", name)
					return nil
				},
			},
			{
				Name:    "status",
				Aliases: []string{"st"},
				Usage:   "Get status of a trading bot",
				Flags: []cli.Flag{
					&cli.StringFlag{
						Name:     "name",
						Usage:    "Name of the trading bot to check",
						Required: true,
					},
				},
				Action: func(c *cli.Context) error {
					name := c.String("name")
					fmt.Printf("Getting status of trading bot '%s'...\n", name)
					return nil
				},
			},
		},
	}

	if err := app.Run(os.Args); err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}
}
