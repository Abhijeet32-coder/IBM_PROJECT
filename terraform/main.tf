provider "aws" {
  region = "us-east-1"
}

# Create an EC2 instance
resource "aws_instance" "example" {
  ami           = "AMI_ID"  
  instance_type = "t2.micro"
  
  tags = {
    Name = "TerraformInstance"
  }
}

# Output the public IP of the instance
output "instance_public_ip" {
  value = aws_instance.example.public_ip
}
