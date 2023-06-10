const data_0176 = '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'
      data.push(data_0176)