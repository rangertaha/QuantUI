/*
Copyright © 2023 CYBINT LLC <coder@cybint.io>
*/
package config

import (
	"fmt"
	"io"
	"os"
	"path/filepath"

	"github.com/hashicorp/hcl/v2/hclsimple"
	"github.com/rangertaha/hyperio/internal/utils"

	_ "embed"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

const (
	CONFIG_FILENAME = "config.hcl"
	DefaultSubject  = "ares.cmd"
)

var (
	//go:embed config.hcl
	DefaultConfigBytes []byte
)

type (
	Tags map[string]string

	Config struct {
		Debug   bool   `hcl:"debug,optional"`
		Version string `hcl:"version,optional"`
		Tags    Tags   `hcl:"tags,optional"`

		Broker *Broker `hcl:"broker,block"`

		// Plugins
		// Inputs     []*Plugin `hcl:"input,block"`
		// Processors []*Plugin `hcl:"processor,block"`
		// Strategies []*Plugin `hcl:"strategy,block"`
		// Outputs    []*Plugin `hcl:"output,block"`
	}
)

func init() {
	// Outputs to nowhere
	zerolog.SetGlobalLevel(zerolog.ErrorLevel)
	log.Logger = log.Output(io.Discard)
}

// New creates a new configuration
func New(options ...func(*Config) error) (*Config, error) {
	s := &Config{} // Default values

	// Apply config options
	for _, opt := range options {
		err := opt(s)
		if err != nil {
			return nil, err
		}
	}

	return s, nil
}

// func CliOptions(ctx context.Context, cmd *cli.Command) func(c *Config) error {
// 	// Basic command line optoins
// 	debug := cmd.Bool("debug")

// 	if debug {
// 		zerolog.SetGlobalLevel(zerolog.DebugLevel)
// 		log.Logger = log.Output(os.Stdout)
// 	}

// 	return func(c *Config) error {
// 		c.Debug = debug
// 		return nil
// 	}
// }

func DefaultConfig() func(*Config) error {
	return func(c *Config) error {
		cfgFile, err := GetOrCreateConfigFile(CONFIG_FILENAME, DefaultConfigBytes)
		if err != nil {
			return err
		}

		// Decode the configuration file
		if err := hclsimple.DecodeFile(cfgFile, utils.CtxFunctions, c); err != nil {
			return fmt.Errorf("error parsing config file: %w", err)
		}

		return nil
	}
}

func FileOption(cFile string) func(*Config) error {
	return func(c *Config) error {
		cfgFile, err := GetOrCreateConfigFile(cFile, DefaultConfigBytes)
		if err != nil {
			return err
		}

		// Decode the configuration file
		if err := hclsimple.DecodeFile(cfgFile, utils.CtxFunctions, c); err != nil {
			return fmt.Errorf("error parsing config file: %w", err)
		}

		return nil
	}
}

func GetOrCreateConfigFile(filename string, defaultContent []byte) (string, error) {
	configDir, err := os.UserConfigDir()
	if err != nil {
		return "", err
	}
	appConfigDir := filepath.Join(configDir, "hyperio")
	if err := os.MkdirAll(appConfigDir, 0755); err != nil {
		return "", err
	}
	configPath := filepath.Join(appConfigDir, filename)
	if _, err := os.Stat(configPath); os.IsNotExist(err) {
		// File does not exist, create it with default content
		if err := os.WriteFile(configPath, defaultContent, 0644); err != nil {
			return "", err
		}
		fmt.Println("Created new config file:", configPath)
	} else {
		fmt.Println("Config file exists:", configPath)
	}
	return configPath, nil
}
