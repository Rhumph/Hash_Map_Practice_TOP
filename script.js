class HashMap {
  constructor(size) {
    this.size = size;
    this.hmArray = Array.from({ length: size }, () => new LinkedList());
  }

  moreBuckets(nodeNumbers) { 
    let arrayLength = this.hmArray.length;
    let loadFactor = nodeNumbers / arrayLength;

    if (loadFactor >= 0.75) { 
      let newSize = arrayLength * 2;
      let newHmArray = Array.from({ length: newSize }, () => new LinkedList());

      this.hmArray.forEach(bucket => {
        let current = bucket.head;
        while (current !== null) {
          let newHash = hash(current.key, newSize);
          console.log(newHash)
          newHmArray[newHash].append(current.key, current.value);
        //   console.log(newHmArray[0])
          newHash = null
          current = current.next;
        }
      });

      this.hmArray = newHmArray;
      this.size = newSize;
    }
  }

  set(key, value) {
    // console.log(this.entries().length)
    this.moreBuckets(this.entries().length)
    const hashNode = { key, value };
    const hashedHN = hash(hashNode.key, this.hmArray.length);
    const bucketLLN = new Node(hashedHN, value);

    this.hmArray[hashedHN].append(bucketLLN.key, bucketLLN.value);
  }

  get(key) {
    // indexCheck(key)
    let target = this.hmArray[key];
    let targetValues = [];

    if (target) {
      let current = target.head;
      while (current !== null) {
        targetValues.push(current.value);
        console.log(current.value);
        current = current.next;
      }
      return targetValues;
    } else {
      return null;
    }
  }

  has(key) {
    let hasKey = false;

    this.hmArray.forEach((bucket) => {
      let current = bucket.head;

      while (current !== null) {
        if (current.key === key) {
          hasKey = true;
          console.log(hasKey);
          return String(hasKey);
        } else {
          current = current.next;
        }
      }
    });
    console.log(hasKey);
    return String(hasKey);
  }

  remove(key) {
    let target = this.hmArray[key];

    if (target === null) {
      console.log("False");
      return String("False");
    } else if (target !== null) {
      console.log("pre" + target);
      target.head = null;
      console.log("post" + target);
      console.log("True");
      return String("true");
    }
  }

  length(){ 
    let arrayKeys = 0

    this.hmArray.forEach((bucket) => {
        let current = bucket.head;
          if (current !== null) {
            arrayKeys += 1

          } 
        }
      );
      console.log(arrayKeys)
      return arrayKeys
  }

  clear(){ 
    this.hmArray.forEach(bucket => {
        bucket.head = null
    });
  }

  keys(){ 
    let arrayKeys = []

    this.hmArray.forEach(bucket => {
        if(bucket.head !== null){ 
            arrayKeys.push(bucket.head.key)
        }
    })
    console.log(arrayKeys)
    return arrayKeys
  }

  values(){ 
        let arrayKeysValues = []
    
        this.hmArray.forEach(bucket => {
            if(bucket.head !== null){ 
                let current = bucket.head
                while(current !== null){
                arrayKeysValues.push(current.value)
                current = current.next
                }
            }
        })
        console.log(arrayKeysValues)
        return arrayKeysValues
  }

  entries(){ 
    let arrayKeysValues = []

    this.hmArray.forEach(bucket => {
        if(bucket.head !== null){ 
            let current = bucket.head
            while(current !== null){
            arrayKeysValues.push({key: current.key, value: current.value})
            current = current.next
            }
        }
    })
    // console.log(arrayKeysValues)
    return arrayKeysValues
}
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(key, value) {
    const newNode = new Node(key, value);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
}

class Node {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

function indexCheck(index) {
  if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bound");
  }
}

function hash(key, buckets) {
  let hashCode = 0;

  const primeNumber = 31;
  if(Number.isInteger(key)){
    hashCode = primeNumber * hashCode + key;
    hashCode = hashCode % buckets;
  }else{
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
    hashCode = hashCode % buckets;
  }}

  return hashCode;
}

// let testHM = new HashMap(16);
// testHM.set("Carla", "Jenkins");
// testHM.set("Carla", "Lester");
// testHM.set("Carl", "Jenkin");
// testHM.get(8);
// testHM.has(9);
// // testHM.remove(9);
// testHM.has(9);
// testHM.length()
// // testHM.clear()
// // testHM.length()
// // testHM.keys()
// // testHM.values()
// testHM.entries()

// // console.log(testHM.hmArray);

const test = new HashMap(16) // or HashMap() if using a factory

test.set("apple", "red")
test.set("banana", "yellow")
test.set("carrot", "orange")
test.set("dog", "brown")
test.set("elephant", "gray")
test.set("frog", "green")
test.set("grape", "purple")
test.set("hat", "black")
test.set("ice cream", "white")
test.set("jacket", "blue")
test.set("kite", "pink")
test.set('lion', 'golden')
test.set('beanie', "warm")
test.set("ice cream", "creamy white")

test.values()

console.log(test)