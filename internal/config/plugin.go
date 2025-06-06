/*
Copyright © 2023 CYBINT LLC <coder@cybint.io>
*/
package config

import (
	"time"
)

const (
	KVTypeString = "string"
	KVTypeInt    = "int"
	KVTypeFloat  = "float"
	KVTypeBool   = "bool"
)

type (
	Plugin struct {
		Id      string `hcl:"name,label"`
		Summary string `hcl:"summary,optional"`

		// Timing
		Interval   time.Duration `hcl:"interval,optional"`
		Resolution time.Duration `hcl:"resolusion,optional"`
		Precision  time.Duration `hcl:"precision,optional"`
		Window     time.Duration `hcl:"window,optional"`

		Tags      Tags          `hcl:"tags,optional"`
		Creds     []Credentials `hcl:"credentials,optional"`
		KeyValues []KeyValue    `hcl:"settings,optional"`

		// Imported HCL file
		// file string
	}
)

type Credentials struct {
	ID        int        `hcl:"id,optional"`
	Provider  string     `hcl:"provider,optional"`
	KeyValues []KeyValue `hcl:"settings,optional"`
}

type KeyValue struct {
	Key   string      `hcl:"key"`
	Value interface{} `hcl:"value"`
	Type  string      `hcl:"type"`
}
