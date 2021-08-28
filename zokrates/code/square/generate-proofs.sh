#!/bin/bash
echo "Generating 10 proofs"

for i in `seq 1 10`;
do
  a=$(( 2 * i ))
  b=$(( a * a ))
  zokrates compute-witness -a $a $b -o ./proofs/witness_$i
  zokrates generate-proof -w ./proofs/witness_$i -j ./proofs/proof_$i.json
  zokrates verify -j ./proofs/proof_$i.json
done