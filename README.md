# adrjs

`adrjs` is a Node implementation of adr-tools.

Many teams use a mix of operating systems and they need to use different tools
to achieve the same job.

For those teams that work with node, this package serves as a single command
that can be added in `devDependencies`, and maintain a consistent experience
across platforms.

## Usage

```
npx adrjs init PATH
  Set a folder to store your decisions
  
  Example:
  
  npx adrjs docs/adr
  
npx adrjs new DECISION-TITLE
  Create a new decision based on a template. DECISION-TITLE does not need to be
  quoted unless it contains special characters.
  
  Example:
  
  npx adrjs new We will make lazy foxes jump over brown dogs 
```

## Major Versions

Major version 1 will always remain compatible with npryce's adr-tools.
