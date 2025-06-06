package app

import (
	"embed"
	"fmt"
	"os"
	"path/filepath"

	"github.com/hashicorp/hcl/v2/gohcl"
	"github.com/hashicorp/hcl/v2/hclparse"
)

//go:embed config.hcl
var assets embed.FS

// App struct
type AppConfig struct {
	Debug bool `hcl:"debug"`
}

// NewApp creates a new App application struct
func NewAppConfig() *AppConfig {
	return &AppConfig{}
}

func GetOrCreateConfig() *AppConfig {
	configfile, err := GetOrCreateConfigFile("config.hcl", []byte("{}"))
	if err != nil {
		panic(err)
	}

	parser := hclparse.NewParser()
	file, diags := parser.ParseHCLFile(configfile)
	if diags.HasErrors() {
		panic(diags)
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
