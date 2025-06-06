// Hyperio Configuration
//
debug = false
version = "0.0.0"

// Default tags 
tags = {
  "CUR" = "USD"
  "SYM" = ""
  "EXC" = ""
} 

broker "nats" { 
  name = "hyperio" 
}



inputs "polygon" {
  credentials {
    key = "polygon_api_key"
    secret = "polygon_api_secret"
  }
}

