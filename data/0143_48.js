const data_0143 = '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'
      data.push(data_0143)