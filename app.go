package app

import (
	"context"
	"fmt"
	"os"

	"github.com/rangertaha/hyperio/internal/config"
)

// App struct
type App struct {
	ctx    context.Context
	config *config.Config
}

// NewApp creates a new App application struct
func NewApp() *App {
	config, err := config.LoadConfig()
	if err != nil {
		panic(err)
	}
	return &App{
		config: config,
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) Create(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) Update(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) Delete(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
